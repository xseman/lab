import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from "npm:tsoa";

export interface User {
	id: number;
	email: string;
	name: string;
}

export interface UserCreationParams extends Pick<User, "email" | "name"> {}

export class UsersService {
	public get(id: number, name?: string): User {
		return {
			id,
			email: "jane@doe.com",
			name: name ?? "Jane Doe",
		};
	}

	public create(userCreationParams: UserCreationParams): User {
		return {
			id: Math.floor(Math.random() * 10_000), // Random
			...userCreationParams,
		};
	}
}

@Route("users")
export class UsersController extends Controller {
	@Get("{userId}")
	public getUser(
		@Path() userId: number,
		@Query() name?: string,
	): User {
		return new UsersService().get(userId, name);
	}

	@SuccessResponse("201", "Created")
	@Post()
	public createUser(
		@Body() requestBody: UserCreationParams,
	): void {
		this.setStatus(201);
		new UsersService().create(requestBody);
		return;
	}
}
