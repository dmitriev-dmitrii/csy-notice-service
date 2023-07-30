import { RequireAtLeastOne } from "type-fest";

interface ContactName {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

export interface Contact {
  addresses?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: "HOME" | "WORK";
  }[];
  birthday?: string; // YYYY-MM-DD
  emails?: {
    email?: string;
    type: "HOME" | "WORK";
  }[];
  name: {
    formatted_name: string;
  } & RequireAtLeastOne<
    ContactName,
    "first_name" | "last_name" | "middle_name" | "prefix" | "suffix"
  >;
  org?: {
    company?: string;
    department?: string;
    title?: string;
  };
  phones?: {
    phone?: string;
    type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
    wa_id?: string;
  }[];
  urls?: {
    url?: string;
    type?: "HOME" | "WORK";
  }[];
}
