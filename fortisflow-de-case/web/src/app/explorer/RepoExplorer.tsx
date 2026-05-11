"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import {
  ChevronRight,
  File,
  FileCode,
  FileJson,
  FileText,
  Folder,
  GitBranch,
  Home,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigateToPath, type RepoNode, repoRoot } from "@/lib/repoExplorerTree";

function extIcon(name: string, type: RepoNode["type"]) {
  if (type === "dir") return Folder;
  const ext = name.includes(".") ? name.split(".").pop()?.toLowerCase() : "";
  if (ext === "py") return FileCode;
  if (ext === "json" || ext === "yml" || ext === "yaml") return FileJson;
  if (ext === "md" || ext === "mdx") return FileText;
  if (ext === "sql" || ext === "ts" || ext === "tsx" || ext === "mjs" || ext === "ini") return FileCode;
  return File;
}

export function RepoExplorer() {
  const [segments, setSegments] = useState<string[]>([]);
  const [selected, setSelected] = useState<RepoNode | null>(null);

  const { node: current, rows, invalidPath } = useMemo(() => {
    const n = navigateToPath(segments);
    const invalid = segments.length > 0 && n === null;
    return { node: n, rows: n?.children ?? [], invalidPath: invalid };
  }, [segments]);

  const openDir = useCallback((name: string) => {
    setSegments((s) => [...s, name]);
    setSelected(null);
  }, []);

  const crumbs = useMemo(() => {
    const items: { label: string; pathLen: number }[] = [{ label: repoRoot.name, pathLen: 0 }];
    segments.forEach((seg, i) => items.push({ label: seg, pathLen: i + 1 }));
    return items;
  }, [segments]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[hsl(222,47%,7%)] shadow-lg">
      {/* GitHub-ish repo bar */}
      <div className="flex flex-col gap-3 border-b border-border/90 bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
          <Scale className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="font-semibold text-foreground">tax-analytics</span>
          <span className="text-muted-foreground">/</span>
          <span className="truncate font-medium text-muted-foreground">full-stack-applications</span>
          <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Public
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background/50 px-2.5 py-1 text-xs font-medium">
            <GitBranch className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>main</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
            App
          </Link>
        </div>
      </div>

      {/* Breadcrumb path */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border/80 px-4 py-2.5 text-xs text-muted-foreground sm:px-5">
        {crumbs.map((c, i) => (
          <Fragment key={`${c.label}-${c.pathLen}`}>
            {i > 0 ? <ChevronRight className="h-3 w-3 shrink-0 opacity-50" aria-hidden /> : null}
            <button
              type="button"
              disabled={i === crumbs.length - 1}
              onClick={() => {
                setSegments(segments.slice(0, c.pathLen));
                setSelected(null);
              }}
              className={cn(
                "rounded px-1 py-0.5 font-mono transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-100",
                i === crumbs.length - 1 && "text-foreground",
              )}
            >
              {c.label}
            </button>
          </Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        {/* File tree */}
        <div className="min-w-0 border-b border-border/80 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-border/60 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:px-5">
            <span>Name</span>
            <span className="hidden sm:block">Last commit</span>
          </div>
          <div role="list">
            {segments.length > 0 ? (
              <button
                type="button"
                role="listitem"
                onClick={() => {
                  setSegments((s) => s.slice(0, -1));
                  setSelected(null);
                }}
                className="flex w-full items-center gap-2 border-b border-border/40 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/40 sm:px-5"
              >
                <Folder className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="font-mono text-muted-foreground">..</span>
                <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">Parent</span>
              </button>
            ) : null}
            {rows.map((node) => {
              const Icon = extIcon(node.name, node.type);
              const isDir = node.type === "dir";
              return (
                <button
                  key={node.name}
                  type="button"
                  role="listitem"
                  onClick={() => {
                    if (isDir) openDir(node.name);
                    else setSelected(node);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-border/40 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/40 sm:px-5",
                    selected?.name === node.name && !isDir && "bg-muted/30",
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isDir ? "text-primary" : "text-muted-foreground")} aria-hidden />
                  <span className="min-w-0 flex-1 truncate font-mono text-foreground">{node.name}</span>
                  <span className="hidden min-w-0 flex-[1.2] truncate text-right text-xs text-muted-foreground sm:block">
                    {node.commitHint}
                  </span>
                  <span className="hidden w-16 shrink-0 text-right text-[11px] text-muted-foreground/70 sm:inline">3d</span>
                </button>
              );
            })}
          </div>
          {invalidPath ? (
            <p className="px-4 py-8 text-center text-sm text-amber-200/90 sm:px-5">Path not found; use the breadcrumb to go back.</p>
          ) : rows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground sm:px-5">This folder is empty.</p>
          ) : null}
        </div>

        {/* Blob / preview */}
        <div className="flex min-h-[280px] flex-col bg-[hsl(222,44%,8%)] lg:min-h-[420px]">
          {selected ? (
            <>
              <div className="border-b border-border/80 px-4 py-2.5 sm:px-5">
                <p className="font-mono text-xs text-muted-foreground">{[repoRoot.name, ...segments, selected.name].join("/")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{selected.name}</p>
              </div>
              <div className="flex-1 overflow-auto p-4 sm:p-5">
                {selected.description ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No description for this file.</p>
                )}
                {selected.sample ? (
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/30 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {selected.sample}
                  </pre>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
              <File className="h-10 w-10 text-muted-foreground/40" aria-hidden />
              <p className="max-w-xs text-sm text-muted-foreground">
                Select a file to preview its role in the data-engineering layout. Folders open on click.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
