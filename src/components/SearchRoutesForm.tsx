"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "@/hooks/useSearch";

const searchSchema = z.object({
  departureStation: z.string().nonempty("Departure station is required"),
  arrivalStation: z.string().nonempty("Arrival station is required"),
  departureDate: z.string().nonempty("Departure date is required"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchRoutesProps {
  onSearch: (criteria: {
    departureStation?: string;
    arrivalStation?: string;
    departureDate?: string;
  }) => void;
}

export default function SearchRoutes({ onSearch }: SearchRoutesProps) {
  const { search } = useSearch();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormValues) => {
    onSearch({
      departureStation: data.departureStation,
      arrivalStation: data.arrivalStation,
      departureDate: data.departureDate,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Routes</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="departureStation"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="departureStation">Departure Station</Label>
                  <FormControl>
                    <Input
                      id="departureStation"
                      placeholder="Enter departure station"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrivalStation"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="arrivalStation">Arrival Station</Label>
                  <FormControl>
                    <Input
                      id="arrivalStation"
                      placeholder="Enter arrival station"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <FormControl>
                    <Input
                      id="departureDate"
                      type="date"
                      {...field}
                      placeholder="Select departure date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0 m-0">
              <Button type="submit" className="w-full h-10">
                Search
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
