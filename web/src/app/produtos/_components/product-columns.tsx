"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/models";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
    size: 120,
    cell: ({ row }): React.JSX.Element => {
      const imageValue: string | undefined = row.getValue("image");

      return (
        <div className={cn("w-[80px] h-[80px] flex items-center justify-center")}>
          <Image
            src={imageValue ?? "/product-table/placeholder.svg"}
            width={80}
            height={80}
            alt={row.getValue("name")}
            className={cn("h-[80px] w-[80px] object-contain")}
            priority
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
    size: 450,
    cell: ({ row }): React.JSX.Element => {
      return (
        <span
          className={cn("text-sm block min-w-[160px]", "lg:w-[450px] lg:min-w-[unset]")}
          title={row.getValue("name")}
        >
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "brandName",
    header: "Marca",
    size: 120,
    accessorFn: row => row.brand.name,
    cell: ({ row }): React.JSX.Element => {
      return <span className={cn("text-sm")}>{row.original.brand.name}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    size: 120,
    cell: ({ row }): React.JSX.Element => {
      const price = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <span className={cn("text-sm font-medium")}>{formatted}</span>;
    },
  },
];

export const productSkeletonColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
    size: 120,
    cell: (): React.JSX.Element => {
      return <Skeleton className={cn("w-[80px] h-[80px]")} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
    size: 450,
    cell: (): React.JSX.Element => {
      return (
        <Skeleton className={cn("w-full min-w-[160px] h-4.5", "lg:w-[450px] lg:min-w-[unset]")} />
      );
    },
  },
  {
    accessorKey: "brandName",
    header: "Marca",
    size: 120,
    accessorFn: row => row.brand?.name,
    cell: (): React.JSX.Element => {
      return <Skeleton className={cn("h-4.5")} />;
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    size: 120,
    cell: (): React.JSX.Element => {
      return <Skeleton className={cn("h-4.5")} />;
    },
  },
];
