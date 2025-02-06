import { relations } from "drizzle-orm";
import { projectsTable, tasks, usersTable} from "./index";

export const projectRelations = relations(projectsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [projectsTable.user_id],
        references: [usersTable.clerkId],
    }),
}));


export const taskRelations = relations(tasks, ({ one }) => ({
    userId: one(usersTable, {
        fields: [tasks.user_id],
        references: [usersTable.clerkId],
    }),
    project: one(projectsTable, {
        fields: [tasks.projectId],
        references: [projectsTable.id],
    }),
}));