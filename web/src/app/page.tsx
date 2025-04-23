import { cn } from "@/lib/utils";
import { CirclePlus, Package } from "lucide-react";
import Container from "@/components/layout/container";
import QuickAccessCard from "@/app/_components/quick-access-card";

export default function Page(): React.JSX.Element {
  return (
    <Container as="main">
      <div className={cn("flex flex-col gap-8 w-full items-center")}>
        <div className={cn("flex flex-col gap-2")}>
          <h1
            className={cn(
              "scroll-m-20 text-2xl font-extrabold tracking-tight text-center text-foreground",
              "lg:text-4xl"
            )}
          >
            Sistema de Gerenciamento de Produtos
          </h1>
          <p
            className={cn(
              "text-center text-muted-foreground text-sm",
              "lg:text-lg"
            )}
          >
            Gerencie seu inventário com facilidade através de nosso sistema.
          </p>
        </div>
        <div
          className={cn("w-full flex flex-col gap-4 max-w-4xl", "md:flex-row")}
        >
          <QuickAccessCard
            configs={{
              icon: (
                <Package size={28} className={cn("w-6 h-6", "lg:w-7 lg:h-7")} />
              ),
              title: "Produtos Cadastrados",
              description:
                "Visualize a lista completa de produtos com filtros. Veja detalhes como nome, preço, marca e imagem, e gerencie com facilidade.",
              link: {
                text: "Ver produtos",
                attrHref: "/produtos",
                attrTitle: "Ir para a listagem de produtos"
              }
            }}
          />
          <QuickAccessCard
            configs={{
              icon: (
                <CirclePlus
                  size={28}
                  className={cn("w-6 h-6", "lg:w-7 lg:h-7")}
                />
              ),
              title: "Novo Produto",
              description:
                "Preencha o formulário para adicionar um novo produto com todas as informações necessárias.",
              link: {
                text: "Cadastrar produto",
                attrHref: "/produtos/cadastrar",
                attrTitle: "Ir para o cadastro de produto"
              }
            }}
          />
        </div>
      </div>
    </Container>
  );
}
