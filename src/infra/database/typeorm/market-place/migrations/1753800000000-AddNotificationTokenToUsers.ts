import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNotificationTokenToUsers1753800000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "notification_token",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "notification_token");
  }
}
