import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateFavoritesTable1753800000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "favorites",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "product_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datetime",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "favorites",
      new TableForeignKey({
        name: "FK_favorite_user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "favorites",
      new TableForeignKey({
        name: "FK_favorite_product_id",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_favorite_user_product" ON "favorites" ("user_id", "product_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_favorite_user_product"`);
    await queryRunner.dropForeignKey("favorites", "FK_favorite_product_id");
    await queryRunner.dropForeignKey("favorites", "FK_favorite_user_id");
    await queryRunner.dropTable("favorites");
  }
}
