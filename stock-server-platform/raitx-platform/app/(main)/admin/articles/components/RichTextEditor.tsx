"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const addImageRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        title="پررنگ"
      >
        <span className="font-bold text-sm">ب</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        title="ایتالیک"
      >
        <span className="italic text-sm">ک</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
        title="خط خورده"
      >
        <span className="line-through text-sm">خ</span>
      </button>
      <span className="w-px h-6 bg-gray-300 mx-0.5" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("آدرس لینک:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-300" : ""}`}
        title="لینک"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        className="p-2 rounded hover:bg-gray-200"
        title="حذف لینک"
      >
        <span className="text-xs text-gray-600">حذف لینک</span>
      </button>
      <span className="w-px h-6 bg-gray-300 mx-0.5" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("آدرس تصویر (URL یا خالی برای آپلود):");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-200"
        title="درج تصویر با URL"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      <label className="p-2 rounded hover:bg-gray-200 cursor-pointer" title="آپلود تصویر">
        <input
          ref={addImageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                editor.chain().focus().setImage({ src: dataUrl }).run();
              };
              reader.readAsDataURL(file);
            }
            e.target.value = "";
          }}
        />
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </label>
      <span className="w-px h-6 bg-gray-300 mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="p-2 rounded hover:bg-gray-200"
        title="درج جدول"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className="p-1.5 rounded hover:bg-gray-200 text-xs"
        title="ستون بعد"
      >
        +ستون
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className="p-1.5 rounded hover:bg-gray-200 text-xs"
        title="سطر بعد"
      >
        +سطر
      </button>
      <span className="w-px h-6 bg-gray-300 mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
        title="لیست نقطه‌ای"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
        title="لیست شماره‌دار"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""}`}
        title="عنوان ۲"
      >
        <span className="text-sm font-bold">ع۲</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""}`}
        title="عنوان ۳"
      >
        <span className="text-sm font-bold">ع۳</span>
      </button>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "محتوا را اینجا بنویسید… جدول، لینک و تصویر از نوار بالا.",
  minHeight = "280px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener" } }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        dir: "rtl",
        class: "prose prose-sm max-w-none text-right min-h-[200px] px-3 py-2 focus:outline-none",
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <div className="RichTextEditor-tiptap">
        <EditorContent editor={editor} />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .RichTextEditor-tiptap table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        .RichTextEditor-tiptap th, .RichTextEditor-tiptap td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: right; }
        .RichTextEditor-tiptap th { background: #f9fafb; font-weight: 600; }
        .RichTextEditor-tiptap img { max-width: 100%; height: auto; border-radius: 8px; }
        .RichTextEditor-tiptap a { color: #ff5538; text-decoration: underline; }
        .RichTextEditor-tiptap ul, .RichTextEditor-tiptap ol { padding-right: 1.5em; }
      `}} />
    </div>
  );
}
