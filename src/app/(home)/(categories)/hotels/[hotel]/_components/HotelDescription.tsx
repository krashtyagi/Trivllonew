"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronRight, X, FileText, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HotelDescriptionProps = {
  hotelName: string;
  description: string;
  city?: string;
  address?: string;
  className?: string;
};

export const HotelDescription = ({
  hotelName,
  description,
  city,
  address,
  className,
}: HotelDescriptionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("description") === "true";

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("description", "true");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("description");
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const isLong = (description || "").length > 130;

  if (!description) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {/* 2-3 line clamped preview on the hotel page */}
      <div className="relative">
        <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {description}
        </p>

        {isLong && (
          <button
            type="button"
            onClick={handleOpen}
            className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-foreground hover:text-primary dark:hover:text-primary underline underline-offset-4 decoration-zinc-400 hover:decoration-primary transition-all cursor-pointer mt-1.5"
          >
            <span>Show full</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Full Description Dialog synced with ?description=true */}
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
          <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] w-[calc(100%-1rem)] max-w-xl max-h-[88vh] rounded-2xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200 outline-none">
            {/* Header: compact padding <= 3, text xs/sm */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <DialogPrimitive.Title className="text-xs sm:text-sm font-bold text-foreground">
                  About this place
                </DialogPrimitive.Title>
              </div>

              <DialogPrimitive.Close
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Description className="sr-only">
              Full description of {hotelName}
            </DialogPrimitive.Description>

            {/* Scrollable Content Body: padding 3, text xs/sm */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span>{hotelName}</span>
                </h2>

                {(city || address) && (
                  <p className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0 text-primary" />
                    <span>{address || city}</span>
                  </p>
                )}
              </div>

              <div className="h-px bg-border/60 my-1" />

              {/* Full Description text with xs / sm font */}
              <div className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {description}
              </div>
            </div>

            {/* Footer: compact padding <= 3 */}
            <div className="px-3 py-2 border-t border-border bg-muted/20 flex justify-end shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="h-7 px-3 text-xs rounded-lg font-semibold"
              >
                Close
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default HotelDescription;
