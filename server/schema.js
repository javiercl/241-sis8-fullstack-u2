const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");
const User = require("./userModel")

const userType = new GraphQLObjectType({
    name: "User",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
    }
})

const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

      getSingleUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_, args) => {
          try {
            return await User.findById(args.id);
          } catch (error) {
            throw new Error(error.message);
          }
        },
      },

      getUsers: {
        type: new GraphQLList(userType),
        resolve: async () => {
          try {
            return await User.find();
          } catch (error) {
            throw new Error(error.message);
          }
        },
      },

    },
  });

  const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: userType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: async (_, args) => {
                try {
                    return await User.create({
                        name: args.name,
                        password: args.password,
                        email: args.email,
                    })
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
        updateUser: {
            type: userType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: async (_, args) => {
                const dataToUpdate = {
                    name: args.name,
                    password: args.password,
                    email: args.email
                }
                try {
                    return await User.findByIdAndUpdate(args.id, dataToUpdate, {
                        new: true
                    })
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
        deleteUser: {
            type: GraphQLString,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
            },
            resolve: async (_, args) => {
                try {
                    await User.findById(args.id).deleteOne()
                    return args.id
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})