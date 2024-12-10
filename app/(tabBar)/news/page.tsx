import { Suspense } from "react";
import NewsLoading from "./loading";
import PageLayout from "@/components/layout/PageLayout";
import { NewsItem } from "@/types/news";
import ErrorMessage from "@/components/common/ErrorMessage";

export default async function News() {
  try {
    const response = await fetch(`/api/news?query=해외`, {
      next: { revalidate: 300 },
      method: "GET",
    });

    if (!response.ok) throw new Error("뉴스 데이터를 불러오는데 실패했습니다");
    const data = await response.json();

    return (
      <Suspense fallback={<NewsLoading />}>
        <PageLayout title="주식 뉴스">
          <div className="space-y-4">
            {data.items?.map((item: NewsItem) => (
              <NewsArticle key={item.link} {...item} />
            ))}
          </div>
        </PageLayout>
      </Suspense>
    );
  } catch (error) {
    return <ErrorMessage message="뉴스를 불러오는데 실패했습니다." />;
  }
}

function NewsArticle({ title, link, description, pubDate }: NewsItem) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        <h2
          className="text-lg font-medium mb-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="text-sm text-neutral-400"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <span className="text-xs text-neutral-500">
          {new Date(pubDate).toLocaleDateString()}
        </span>
      </a>
    </div>
  );
}
