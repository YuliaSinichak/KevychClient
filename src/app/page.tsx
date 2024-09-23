"use client";

import { useEffect, useState } from "react";
import { Route, columns } from "./columns";
import DataTable from "@/components/DataTable";
import SearchRoutes from "@/components/SearchRoutesForm";
import { useSearch } from "@/hooks/useSearch";

async function getRoutes(): Promise<Route[]> {
  const res = await fetch(
    "https://kevych-49a723d13d60.herokuapp.com/route/routes"
  );
  const data = await res.json();
  return data;
}

export default function Page() {
  const [data, setData] = useState<Route[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<{
    departureStation?: string;
    arrivalStation?: string;
    departureDate?: string;
  }>({});

  const { search } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      if (
        searchCriteria.departureStation ||
        searchCriteria.arrivalStation ||
        searchCriteria.departureDate
      ) {
        const results = await search.mutateAsync({
          departureStation: searchCriteria.departureStation || "",
          arrivalStation: searchCriteria.arrivalStation || "",
          departureDate: new Date(searchCriteria.departureDate || new Date()),
        });
        setData(results);
      } else {
        const routes = await getRoutes();
        setData(routes);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [searchCriteria]);

  const handleSearch = (criteria: {
    departureStation?: string;
    arrivalStation?: string;
    departureDate?: string;
  }) => {
    setSearchCriteria(criteria);
  };

  return (
    <div className="min-h-screen w-auto grid items-center mx-10 py-40">
      <SearchRoutes onSearch={handleSearch} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
