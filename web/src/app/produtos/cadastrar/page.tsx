import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/layout/container";
import Link from "next/link";
import ProductRegistrationForm from "@/app/produtos/cadastrar/_components/product-registration-form";

export default function Cadastro(): React.JSX.Element {
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
            <ProductRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
