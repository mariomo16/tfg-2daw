import type { UserRole } from "@shared/models/user.model";

type UserRoleLabel = "Staff" | "Cliente";

export const USER_ROLE_LABEL: Record<UserRole, UserRoleLabel> = {
	staff: "Staff",
	client: "Cliente",
};
