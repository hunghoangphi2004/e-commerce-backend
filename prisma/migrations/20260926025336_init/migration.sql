BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [product_id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(255) NOT NULL,
    [quantity] INT NOT NULL CONSTRAINT [Product_quantity_df] DEFAULT 0,
    [description] NVARCHAR(max) NOT NULL,
    [list_price] DECIMAL(18,2) NOT NULL,
    [sale_price] DECIMAL(18,2) NOT NULL,
    [is_active] BIT NOT NULL CONSTRAINT [Product_is_active_df] DEFAULT 1,
    [is_deleted] BIT NOT NULL CONSTRAINT [Product_is_deleted_df] DEFAULT 0,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Product_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [update_at] DATETIME2,
    [deleted_at] DATETIME2,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([product_id]),
    CONSTRAINT [Product_title_key] UNIQUE NONCLUSTERED ([title])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
