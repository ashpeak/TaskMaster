import { pgTable, text, integer, varchar, date } from "drizzle-orm/pg-core";
import { projectsTable, usersTable } from "./index";

export const tasks = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").notNull(), // e.g., "high", "medium", "low"
  status: text("status").notNull(), // e.g., 'not-started'
  category: text("category"),
  deadline: date("deadline").notNull(),
  user_id: varchar("user_id").notNull().references(() => usersTable.clerkId),
  projectId: integer("project_id").references(() => projectsTable.id, {
    onDelete: "cascade", // Delete all tasks when a project is deleted
  }),
});