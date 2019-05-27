
Create database [RAPI]

CREATE TABLE [dbo].[Users] (
    [Id]        BIGINT         IDENTITY (1, 1) NOT NULL,
    [FirstName] NVARCHAR (MAX) NULL,
    [LastName]  NVARCHAR (MAX) NULL,
    [Email]     NVARCHAR (MAX) NULL,
    [Address]   NVARCHAR (MAX) NULL
);


