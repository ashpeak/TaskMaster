import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./index";

export const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    priority: varchar({ length: 255 }).notNull(),
    user_id: varchar("user_id").notNull().references(() => usersTable.clerkId), // Define foreign key reference
});