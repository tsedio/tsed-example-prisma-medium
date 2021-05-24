import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {Inject} from "@tsed/di";
import {PrismaService} from "../services/PrismaService";
import {Groups, Required, Returns, Summary} from "@tsed/schema";
import {User} from "@prisma/client";

class UserModel implements User {
  @Required()
  @Groups("!creation")
  id: number;

  @Required()
  email: string;

  @Required()
  name: string;
}

@Controller("/users")
export class UsersController {
  @Inject()
  protected prisma: PrismaService;

  @Get("/:id")
  @Summary("Return a use by his id")
  @Returns(200, UserModel)
  async getUser(@PathParams("id") id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

  @Post("/")
  @Summary("Create a new user")
  @Returns(201, UserModel)
  async signupUser(@BodyParams() @Groups("creation") user: UserModel) {
    return this.prisma.user.create({data: user});
  }

  @Get("/")
  @Summary("Return a list of User")
  @(Returns(200, Array).Of(UserModel))
  getUsers() {
    return this.prisma.user.findMany();
  }
}
