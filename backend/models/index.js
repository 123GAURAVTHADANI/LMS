const { DataTypes } = require("sequelize");

// User Model
const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "LIBRARIAN", "MEMBER"),
      allowNull: false,
      defaultValue: "MEMBER",
    },
  },
  {
    tableName: "users",
    timestamps: true, // Automatically adds createdAt and updatedAt fields,
    createdAt: "created_at", // Custom name for createdAt field
    updatedAt: "updated_at", // Custom name
  },
);

// Category Model

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    category_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields,
    tableName: "categories",
    createdAt: "created_at", // Custom name for createdAt field
    updatedAt: "updated_at", // Custom name for updatedAt field
  },
);

// Book Model
const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    book_author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "category_id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "books",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

// Library Model

const Library = sequelize.define(
  "Library",
  {
    library_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    library_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    library_location: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    library_contact: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    librarian_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "libraries",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const member = sequelize.define(
  "Member",
  {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "book_id",
      },
    },
    library_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Library,
        key: "library_id",
      },
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fine_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "members",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

// Define associations between models
User.hasMany(Member, { foreignKey: "user_id" });
Member.belongsTo(User, { foreignKey: "user_id" });

Book.hasMany(Member, { foreignKey: "book_id" });
Member.belongsTo(Book, { foreignKey: "book_id" });

Category.hasMany(Book, { foreignKey: "category_id" });
Book.belongsTo(Category, { foreignKey: "category_id" });

Library.hasMany(Book, { foreignKey: "book_id" });
Book.belongsTo(Library, { foreignKey: "library_id" });

Library.hasMany(Member, { foreignKey: "library_id" });
Member.belongsTo(Library, { foreignKey: "library_id" });

module.exports = { User, Category, Book, Library, member };
