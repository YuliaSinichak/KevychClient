"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoute } from "@/hooks/useRoute";

export type Route = {
  id: number;
  train: string;
  departureStation: string;
  arrivalStation: string;
  arrivalDate: string;
  departureDate: string;
};

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "train",
    header: "Train",
  },
  {
    accessorKey: "departureStation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Departure Station
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "arrivalStation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Arrival Station
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "departureDate",
    header: "Departure Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("departureDate"));
      const formatted = date.toLocaleString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "departureDate",
    header: "Departure Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("departureDate"));
      const formatted = date.toLocaleString("de-DE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "arrivalDate",
    header: "Arrival Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("arrivalDate"));
      const formatted = date.toLocaleString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "arrivalDate",
    header: "Arrival Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("arrivalDate"));
      const formatted = date.toLocaleString("de-DE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const route = row.original;
      const { delete: deleteRoute } = useRoute();

      function onDelete() {
        console.log(route.id);
        const id = route.id;

        deleteRoute.mutate(id, {
          onSuccess: () => {
            window.location.reload();
          },
        });
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(route.train)}
            >
              Copy train name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete}>Delete route</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
