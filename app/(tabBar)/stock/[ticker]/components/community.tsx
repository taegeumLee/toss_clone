"use client";

interface OpinionWithUser extends Opinion {
  user: User;
  likes: Like[];
  comments: Comment[];
}

import { Opinion, User, Comment, Like } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import logo from "@/public/image/logo/Toss_Symbol_Primary.png";
import { TbDotsVertical } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from "framer-motion";
import { checkTime } from "@/components/common/checkTime";

export default function Community({ ticker }: { ticker: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [opinions, setOpinions] = useState<OpinionWithUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpinion, setSelectedOpinion] =
    useState<OpinionWithUser | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredOpinions = useMemo(() => {
    if (!Array.isArray(opinions)) {
      return [];
    }

    return [...opinions].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [opinions]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [opinionsResponse, userResponse] = await Promise.all([
          fetch(`/api/stock/getOpinion?ticker=${ticker}`),
          fetch("/api/user"),
        ]);

        if (!opinionsResponse.ok || !userResponse.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }

        const [opinionsData, userData] = await Promise.all([
          opinionsResponse.json(),
          userResponse.json(),
        ]);

        if (Array.isArray(opinionsData)) {
          setOpinions(opinionsData);
        } else {
          console.error("의견 데이터가 배열이 아닙니다:", opinionsData);
          setOpinions([]);
        }

        setUser(userData.user);
      } catch (error) {
        console.error("데이터 fetching 오류:", error);
        setError(
          error instanceof Error ? error.message : "오류가 발생했습니다"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    const response = await fetch(`/api/stock/newOpinion?ticker=${ticker}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        opinion: inputRef.current.value,
        userId: user.id,
        stockId: ticker,
      }),
    });

    const newOpinion = await response.json();

    const opinionWithUser = {
      ...newOpinion.newOpinion,
      user: {
        id: user.id,
        nickname: user.nickname,
        profileImage: user.profileImage,
      },
      likes: [], // likes 배열 추가
      comments: [],
    };

    setOpinions((prev) => [opinionWithUser, ...prev]);
    inputRef.current.value = "";
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/stock/deleteOpinion?opinionId=${selectedOpinion?.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("의견 삭제에 실패했습니다.");
      }

      setOpinions((prev) =>
        prev.filter((opinion) => opinion.id !== selectedOpinion?.id)
      );
      setIsModalOpen(false);
      setSelectedOpinion(null);
    } catch (error) {
      console.error("의견 삭제 중 오류 발생:", error);
      alert("의견을 삭제하는 중 오류가 발생했습니.");
    }
  };

  const handleModalToggle = (opinion: OpinionWithUser) => {
    if (selectedOpinion?.id === opinion.id) {
      setIsModalOpen(false);
      setSelectedOpinion(null);
    } else {
      setIsModalOpen(true);
      setSelectedOpinion(opinion);
    }
  };

  const handleLike = async (opinionId: string) => {
    const isLiked = opinions
      .find((opinion) => opinion.id === opinionId)
      ?.likes.some((like) => like.userId === user.id);
    const optimisticUpdate = (prevOpinions: OpinionWithUser[]) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id !== opinionId) return opinion;

        const isLiked = opinion.likes.some((like) => like.userId === user.id);
        const updatedLikes = isLiked
          ? opinion.likes.filter((like) => like.userId !== user.id)
          : [
              ...opinion.likes,
              {
                id: `temp-${Date.now()}`,
                userId: user.id,
                opinionId,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ];

        return { ...opinion, likes: updatedLikes };
      });
    };

    try {
      setOpinions(optimisticUpdate);

      const response = await fetch(`/api/stock/likeOpinion`, {
        method: isLiked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, opinionId }),
      });

      if (!response.ok) throw new Error("좋아요 처리 실패");
    } catch (error) {
      // 실패 시 원래 상태로 복구
      setOpinions((prevOpinions) =>
        prevOpinions.map((opinion) =>
          opinion.id === opinionId
            ? opinions.find((o) => o.id === opinionId)!
            : opinion
        )
      );
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col bg-neutral-800 p-4 rounded-lg w-3/4 gap-4">
        <span className="text-2xl font-medium">{ticker} 커뮤니티</span>
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-2 w-1/10">
            <Image
              src={user.profileImage || logo}
              alt="user"
              width={30}
              height={30}
            />
            <span className="text-neutral-400 text-xs">{user.nickname}</span>
          </div>
          <form
            className="flex items-center gap-2 flex-1"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              ref={inputRef}
              placeholder={`${user.nickname}님의 의견을 남겨주세요.`}
              className="bg-neutral-700 rounded-lg px-4 py-2 flex-1 text-neutral-200 outline-none border-none"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              type="submit"
            >
              등록
            </button>
          </form>
        </div>
        {/* 커뮤니티 목록 */}
        {Array.isArray(opinions) &&
          opinions.map((opinion) => (
            <div
              key={opinion.id}
              className="flex gap-4 p-4 border-t border-neutral-700 items-center"
            >
              {/* 커뮤니티 작성자 */}
              <div className="flex flex-col items-center gap-2 w-1/10">
                <Image
                  src={opinion.user.profileImage || logo}
                  alt={opinion.user.nickname || ""}
                  width={30}
                  height={30}
                />
                <span className="text-neutral-400 text-xs">
                  {opinion.user.nickname}
                </span>
              </div>
              {/* 커뮤니티 내용 */}
              <div className="flex-1 gap-1/2 flex flex-col">
                <div className="flex gap-1 pb-2 items-center">
                  <span className="text-neutral-200">{opinion.content}</span>
                  <span className="text-xs text-neutral-500">
                    {checkTime(opinion.createdAt)}
                  </span>{" "}
                </div>
                {/* 좋아요 댓글 */}
                <div className="flex p-1 justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="flex items-center gap-1"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        animate={
                          opinion.likes.some((like) => like.userId === user.id)
                            ? {
                                scale: [1, 1.2, 1],
                                transition: { duration: 0.3 },
                              }
                            : {}
                        }
                      >
                        <FaHeart
                          onClick={() => handleLike(opinion.id)}
                          className={`cursor-pointer transition-all duration-200 ${
                            opinion.likes.some(
                              (like) => like.userId === user.id
                            )
                              ? "text-red-500 hover:text-red-600"
                              : "text-neutral-500 hover:text-neutral-200"
                          }`}
                        />
                      </motion.div>
                      <motion.span
                        className="text-xs text-neutral-500"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        key={opinion.likes.length}
                        transition={{ duration: 0.2 }}
                      >
                        {opinion.likes.length}
                      </motion.span>
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <IoChatbox
                        className={`text-neutral-500 ${
                          opinion.comments.length === 0 ? "opacity-50" : ""
                        }`}
                      />
                      <span className="text-xs text-neutral-500">
                        {opinion.comments.length}
                      </span>
                    </div>
                  </div>
                  {opinion.user.id === user.id && (
                    <div className="flex items-center relative">
                      <TbDotsVertical
                        className="text-neutral-500 hover:text-neutral-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModalToggle(opinion);
                        }}
                      />
                      {isModalOpen && selectedOpinion?.id === opinion.id && (
                        <div className="absolute top-6 right-1 w-28 flex flex-col gap-2 bg-neutral-700 rounded-lg p-2 modal-container">
                          <button className="flex items-center gap-1 text-neutral-200 hover:bg-neutral-600 px-2 py-1 rounded-md">
                            <BsFillPencilFill />
                            수정하기
                          </button>
                          <button
                            className="flex items-center gap-1 text-neutral-200 hover:bg-neutral-600 px-2 py-1 rounded-md"
                            onClick={handleDelete}
                          >
                            <FaRegTrashCan />
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="bg-neutral-800 p-4 rounded-lg w-1/4">주문하기</div>
    </div>
  );
}
