import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import BlessingItem from "./components/blessing-item";
import Toolbar from "./components/toolbar";
import { useEventStore } from "../../states/event-store";
import { Blessing } from "../../types/blessing";
import { SortOptions } from "../../types/sort-options";
import {
  compareByAmount,
  compareByDate,
} from "../../utils/compare-blessings.util";
import SideBar from "../../components/header";

const ShowBlessings: React.FC<any> = () => {
  const { eventId } = useEventStore();
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [filtered, setFiltered] = useState<Blessing[]>([]);

  useEffect(() => {
    fetchBlessings();
  }, []);

  const fetchBlessings = async () => {
    try {
      const { data } = await useApi.blessing().getByEvent(8);
      setBlessings(data);
      setFiltered(data);
    } catch (err) {
      alert(err);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const query = e.currentTarget.value.toLowerCase() as string;
    if (query !== "") {
      const result = blessings.filter(
        (blessing: Blessing) =>
          blessing && blessing.createdBy.toLowerCase().includes(query)
      );
      setFiltered(result);
    } else {
      setFiltered(blessings);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const option = e.target.value as SortOptions;
    if (option === SortOptions.Amount) {
      setFiltered((blessings) => blessings.sort(compareByAmount));
    } else if (option === SortOptions.Date) {
      setFiltered((blessings) => blessings.sort(compareByDate));
      console.log(filtered);
    }
  };

  return (
    <>
      <SideBar />
      <h2>All Blessings</h2>
      <Toolbar
        handleSearch={handleSearch}
        options={SortOptions}
        handleSort={handleSort}
      />

      <div>
        {filtered &&
          filtered.map((blessing) => {
            return <BlessingItem key={"" + blessing.id} {...blessing} />;
          })}
      </div>
    </>
  );
};

export default ShowBlessings;
