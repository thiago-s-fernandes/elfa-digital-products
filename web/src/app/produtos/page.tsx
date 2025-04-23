"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { productColumns, productSkeletonColumns } from "@/app/produtos/_components/product-columns";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/container";
import Link from "next/link";
import ProductTable from "@/components/ui/data-table";
import useGetProducts from "@/hooks/useGetProducts";
import type { Product } from "@/types/models";

const PAGE_SIZE = 4;

export default function Produtos(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameFromURL = searchParams.get("name") ?? "";
  const pageFromURL = parseInt(searchParams.get("page") ?? "1", 10);

  const [nameFilter, setNameFilter] = useState<string>(nameFromURL);
  const [pageIndex, setPageIndex] = useState<number>(pageFromURL - 1); // 0-based index;

  const { data, isLoading, isFetching } = useGetProducts({
    page: pageIndex + 1, // 1-based index
    per_page: PAGE_SIZE,
    name: nameFilter,
  });

  const fakeData: { items: Product[]; total: number } = {
    items: Array(PAGE_SIZE).fill({}),
    total: PAGE_SIZE,
  };

  const formattedData = useMemo(
    () => ({
      items: data?.data.products ?? [],
      total: data?.data.total ?? 0,
    }),
    [data],
  );

  const totalPages = useMemo(
    () => Math.ceil(formattedData.total / PAGE_SIZE),
    [formattedData.total],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(pageIndex + 1));
    if (nameFilter) params.set("name", nameFilter);
    router.push(`?${params}`);

    if (isFetching) return;

    if (formattedData.total === 0 && pageIndex !== 0) {
      setPageIndex(0);
    } else if (pageIndex >= totalPages && totalPages > 0) {
      setPageIndex(totalPages - 1);
    }
  }, [pageIndex, nameFilter, formattedData.total, isFetching, totalPages, router]);

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
          pageSize={PAGE_SIZE}
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
