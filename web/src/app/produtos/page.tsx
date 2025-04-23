"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { productColumns, productSkeletonColumns } from "@/app/produtos/_components/product-columns";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/container";
import Link from "next/link";
import ProductTable from "@/components/ui/data-table";
import useGetProducts from "@/hooks/useGetProducts";
import type { Product } from "@/types/models";

export default function Produtos(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageSize = 4;
  const nameFromURL = searchParams.get("name") ?? "";
  const pageFromURL = parseInt(searchParams.get("page") ?? "1", 10);

  const [nameFilter, setNameFilter] = useState<string>(nameFromURL);
  const [pageIndex, setPageIndex] = useState<number>(pageFromURL - 1); // 0-based index;

  const { data, isLoading, isFetching } = useGetProducts({
    page: pageIndex + 1, // 1-based index
    per_page: pageSize,
    name: nameFilter,
  });

  const fakeData: { items: Product[]; total: number } = {
    items: Array(pageSize).fill({}),
    total: pageSize,
  };

  const formattedData = {
    items: data?.data.products ?? [],
    total: data?.data.total ?? 0,
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", (pageIndex + 1).toString());
    if (nameFilter) params.set("name", nameFilter);

    router.push(`?${params.toString()}`);
  }, [nameFilter, pageIndex, router]);

  useEffect(() => {
    if (!isFetching && formattedData.total === 0 && pageIndex !== 0) {
      setPageIndex(0);
    }
  }, [formattedData.total, isFetching, pageIndex]);

  return (
    <Container as="main">
      <div className={cn("w-full flex flex-col")}>
        <div className={cn("flex items-center justify-between mb-8")}>
          <div className={cn("flex items-center gap-4")}>
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <h1 className={cn("text-xl font-bold text-foreground", "lg:text-2xl")}>
              Produtos Cadastrados
            </h1>
          </div>
        </div>
        <ProductTable
          columns={productColumns}
          skeletonColumns={productSkeletonColumns}
          data={isLoading ? fakeData : formattedData}
          isFetching={isFetching}
          pageSize={pageSize}
          pageIndex={pageIndex}
          onPaginationChange={setPageIndex}
          handleSearch={e => {
            setPageIndex(0);
            setNameFilter(e.target.value);
          }}
        />
      </div>
    </Container>
  );
}
