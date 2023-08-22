import {drizzle} from "drizzle-orm/libsql";
import {createClient} from "@libsql/client";
export const libsqlClient = createClient({
    url:"file:///./db.sqlite"
})
export const db = drizzle(libsqlClient);
