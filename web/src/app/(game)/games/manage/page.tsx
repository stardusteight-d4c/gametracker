"use client"

import { useState } from "react"

import { Navbar } from "@/shared/components/organisms/Navbar"
import { Pencil, Send, Trash } from "lucide-react"
import { New } from "@/modules/game/pages/manage/components/New/New"
import { Edit } from "@/modules/game/pages/manage/components/Edit/Edit"
import { Delete } from "@/modules/game/pages/manage/components/Delete/Delete"

export default function Manage() {
  const [activeMode, setActiveMode] = useState<"new" | "edit" | "delete">("new")

  return (
    <main className="w-screen min-h-screen">
      <div className="flex flex-col h-screen items-center justify-center">
        <Navbar />
        <div className="flex flex-col relative max-w-[358px] w-full border border-dark-mid/10 mt-[61px] rounded p-7">
          <div className="flex items-center gap-x-2 absolute right-7 top-2">
            <div className="relative group">
              <Send
                size={24}
                onClick={() => setActiveMode("new")}
                className={`cursor-pointer text-dark-low p-1 rounded-sm ${
                  activeMode === "new" && "bg-light-str/90"
                }`}
              />
              <div className="absolute border border-dark-low/30 z-50 whitespace-nowrap hidden group-hover:block -bottom-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                New
              </div>
              <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -bottom-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
            </div>
            <div className="relative group">
              <Pencil
                size={24}
                onClick={() => setActiveMode("edit")}
                className={`cursor-pointer text-dark-low p-1 rounded-sm ${
                  activeMode === "edit" && "bg-light-str/90"
                }`}
              />
              <div className="absolute border border-dark-low/30 z-50 whitespace-nowrap hidden group-hover:block -bottom-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                Edit
              </div>
              <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -bottom-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
            </div>
            <div className="relative group">
              <Trash
                size={24}
                onClick={() => setActiveMode("delete")}
                className={`cursor-pointer text-dark-low p-1 rounded-sm ${
                  activeMode === "delete" && "bg-light-str/90"
                }`}
              />
              <div className="absolute border border-dark-low/30 z-50 whitespace-nowrap hidden group-hover:block -bottom-9 left-1/2 -translate-x-1/2 bg-dark-str text-light-str rounded-sm py-[1px] px-[4px]">
                Delete
              </div>
              <div className="rotate-45 w-[10px] h-[10px] hidden group-hover:block z-0 absolute -bottom-[13px] border border-dark-low/30 left-1/2 -translate-x-1/2 bg-dark-str" />
            </div>
          </div>
          {activeMode === "new" && <New />}
          {activeMode === "edit" && <Edit />}
          {activeMode === "delete" && <Delete />}
        </div>
      </div>
    </main>
  )
}
