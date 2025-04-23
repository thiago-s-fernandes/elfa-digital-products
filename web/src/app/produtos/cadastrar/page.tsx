"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";
import useCreateProduct from "@/hooks/useCreateProduct";

export default function Cadastro(): React.JSX.Element {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const productSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Nome deve ter pelo menos 1 carácter." })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres." }),
    brandId: z.string().uuid({ message: "Adicione um id válido." }),
    price: z.coerce
      .number({ required_error: "Preço é obrigatório." })
      .positive({ message: "Preço deve ser maior que zero." }),
    description: z
      .string()
      .max(500, { message: "Descrição deve ter no máximo 500 caracteres." })
      .optional(),
    image: z
      .string()
      .refine(val => /^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(val), {
        message: "A imagem precisa estar em formato PNG, JPG, JPEG ou WebP com base64 válido.",
      })
      .optional(),
  });

  type ProductFormValues = z.infer<typeof productSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brandId: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Formato de imagem inválido. Use PNG, JPG, JPEG ou WebP.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = (): void => {
        setImagePreview(reader.result as string);
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue("image", "");
    }
  };

  const { mutateAsync: createProduct, isPending: isSubmitting } = useCreateProduct();

  const onSubmit = async (values: ProductFormValues): Promise<void> => {
    const payload = {
      name: values.name,
      price: values.price,
      brandId: values.brandId,
      ...(values.image && { image: values.image }),
      ...(values.description && { description: values.description }),
    };

    const response = await createProduct(payload).catch(err => err);

    if (response?.error) {
      switch (response.error) {
        case "BRAND_NOT_FOUND":
          toast.error("Marca não encontrada. Verifique o ID da marca.");
          break;

        case "PRODUCT_ALREADY_REGISTERED":
          toast.warning("O conjunto de nome do produto e marca já estão cadastrados.");
          break;

        case "INTERNAL_SERVER_ERROR":
          toast.error("Erro interno do servidor. Tente novamente mais tarde.");
          break;

        default:
          toast.error("Erro inesperado ao cadastrar produto.");
      }
      return;
    }

    toast.success("Produto cadastrado com sucesso!");
    form.reset();
    setImagePreview(null);
  };

  return (
    <Container as="main">
      <div className={cn("w-full flex flex-col")}>
        <div className={cn("w-full flex items-center justify-between mb-8")}>
          <div className={cn("flex items-center gap-4")}>
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <h1 className={cn("text-xl font-bold text-foreground", "lg:text-2xl")}>Novo Produto</h1>
          </div>
        </div>
        <Card className={cn("w-full py-4 rounded-md")}>
          <CardHeader className={cn("border-b px-4 [.border-b]:pb-4")}>
            <CardTitle>Informações do Produto</CardTitle>
            <CardDescription>
              Preencha todos os campos obrigatórios para cadastrar um novo produto.
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("px-4")}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={cn("flex flex-col gap-8 mb-4", "lg:flex-row")}>
                  <div className={cn("flex")}>
                    {/* Image Field */}
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { value: _, onChange, ...field } }) => (
                        <FormItem className={cn("flex flex-col gap-2")}>
                          <FormLabel>Imagem do Produto</FormLabel>
                          <FormControl>
                            <div
                              className={cn(
                                "border-2 border-dashed rounded-lg p-4 transition duration-200 cursor-pointer h-[300px] w-[300px]",
                                imagePreview
                                  ? "border-secondary bg-background"
                                  : "border-muted-foreground/40 hover:border-secondary",
                              )}
                              onClick={() => document.getElementById("product-image")?.click()}
                            >
                              {imagePreview ? (
                                <div className={cn("relative w-full h-full")}>
                                  <Image
                                    alt="Preview"
                                    className={cn("h-full mx-auto object-contain")}
                                    height={300}
                                    src={imagePreview}
                                    width={300}
                                  />
                                </div>
                              ) : (
                                <div
                                  className={cn("h-full flex flex-col items-center justify-center")}
                                >
                                  <Upload size={32} className={cn("text-gray-400 mb-2")} />
                                  <p className={cn("text-sm text-gray-500")}>
                                    Clique para fazer upload (opcional)
                                  </p>
                                </div>
                              )}
                              <input
                                id="product-image"
                                type="file"
                                className={cn("hidden")}
                                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                onChange={e => {
                                  handleImageChange(e);
                                  onChange(e.target.files);
                                }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>PNG, JPG, JPEG ou WebP.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={cn("flex flex-col w-full gap-4", "lg:w-[calc(100%-332px)]")}>
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Produto*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: MacBook Pro M2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Brand Field */}
                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Id da marca*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price Field */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço (R$) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ex: 1299.99" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva as características do produto..."
                              className="min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <CardFooter className={cn("[.border-t]:pt-4 px-0 border-t flex justify-end gap-4")}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn("bg-foreground", "hover:bg-foreground/80")}
                  >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Produto"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
