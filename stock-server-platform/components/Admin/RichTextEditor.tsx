"use client";

import React, { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import {
  Bold,
  Italic,
  Strikethrough,
  Link as LinkIcon,
  ImagePlus,
  Table,
  List,
  ListOrdered,
  Heading2,
  Minus,
} from "lucide-react";

const extensions = [
  StarterKit,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
  }),
  Image.configure({ allowBase64: true }),
  TableKit,
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "توضیحات کامل (می‌تواند شامل متن، لینک، تصویر و جدول باشد)...",
  minHeight = "220px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions,
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        dir: "rtl",
        "data-placeholder": placeholder,
        class:
          "prose prose-invert max-w-none min-h-[120px] px-3 py-2 focus:outline-none text-slate-200",
      },
    },
  });

  const getHTML = useCallback(() => {
    if (!editor || typeof editor.getHTML !== "function") return "";
    return editor.getHTML();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const current = getHTML();
    if (value !== current && (value || "").trim() !== (current || "").trim()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor, getHTML]);

  const onUpdate = useCallback(() => {
    onChange(getHTML());
  }, [getHTML, onChange]);

  useEffect(() => {
    if (!editor) return;
    editor.on("update", onUpdate);
    return () => editor.off("update", onUpdate);
  }, [editor, onUpdate]);

  const setLink = () => {
    if (!editor) return;
    const url = window.prompt("آدرس لینک:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    if (!editor) return;
    const url = window.prompt("آدرس تصویر (URL):");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
        active
          ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-400"
          : "border-slate-600 bg-slate-700/50 text-slate-400 hover:bg-slate-600 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div
      className="rounded-lg border border-slate-600 bg-slate-700/50 overflow-hidden focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/50"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-600 bg-slate-800/50 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="پررنگ"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="مورب"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="خط‌خور"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-slate-600 mx-0.5" />
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="لینک">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="تصویر">
          <ImagePlus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertTable} title="جدول">
          <Table className="h-4 w-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-slate-600 mx-0.5" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="عنوان"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="لیست نقطه‌ای"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="لیست شماره‌دار"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="خط افقی"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <div style={{ minHeight }} className="rich-editor-content">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .rich-editor-content .ProseMirror {
          min-height: 200px;
          padding: 0.75rem 0.75rem;
        }
        .rich-editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: right;
          color: #64748b;
          pointer-events: none;
          height: 0;
        }
        .rich-editor-content .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        .rich-editor-content .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 0.75rem 0;
        }
        .rich-editor-content .ProseMirror th,
        .rich-editor-content .ProseMirror td {
          border: 1px solid #475569;
          padding: 0.5rem 0.75rem;
          text-align: right;
        }
        .rich-editor-content .ProseMirror th {
          background: rgba(14, 165, 233, 0.15);
          color: #22d3ee;
        }
        .rich-editor-content .ProseMirror a {
          color: #22d3ee;
          text-decoration: underline;
        }
        .rich-editor-content .ProseMirror ul,
        .rich-editor-content .ProseMirror ol {
          padding-right: 1.5rem;
        }
      `}</style>
    </div>
  );
}
