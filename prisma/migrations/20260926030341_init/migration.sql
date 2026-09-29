/*
  Warnings:

  - You are about to drop the column `update_at` on the `Product` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Product] DROP COLUMN [update_at];
ALTER TABLE [dbo].[Product] ADD [updated_at] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
