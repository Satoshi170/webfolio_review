import { act, renderHook } from "@testing-library/react";

import { useSortComments } from "../useSortComments";

import type { CommentData } from "../../_comments/types";
import type { UserData } from "@/app/types/auth";

describe("useSortComments", () => {
  const mockUser: UserData = { id: 1, name: "user1", image: null };

  const mockCommentsData: CommentData[] = [
    {
      id: 2,
      content: "test1",
      updatedAt: new Date("2024-01-02"),
      tags: ["suggestion"],
      user: mockUser
    },
    {
      id: 1,
      content: "test2",
      updatedAt: new Date("2024-01-01"),
      tags: ["bug report"],
      user: mockUser
    }
  ];

  describe("asc", () => {
    it("昇順にソートされる", () => {
      const { result } = renderHook(() => useSortComments(mockCommentsData));
      act(() => {
        result.current.sortOrder("asc");
      });
      expect(result.current.sortedComments).toEqual([
        mockCommentsData[1],
        mockCommentsData[0]
      ]);
    });
  });

  describe("desc", () => {
    it("初期状態に戻る", () => {
      const { result } = renderHook(() => useSortComments(mockCommentsData));
      act(() => {
        result.current.sortOrder("desc");
      });
      expect(result.current.sortedComments).toEqual(mockCommentsData);
    });
  });

  describe("invalid arg", () => {
    it("エラーが発生する", () => {
      const { result } = renderHook(() => useSortComments(mockCommentsData));
      expect(() => {
        act(() => {
          result.current.sortOrder("invalid" as "asc");
        });
      }).toThrow(TypeError);
    });
  });
});
