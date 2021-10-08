use `rwbbc_data`;

CREATE VIEW `Inventory` AS select
    `k`.`Id` AS `Id`,
    `k`.`RWBId` AS `RWBId`,
    `k`.`FactorySerial` AS `FactorySerial`,
    `k`.`ReceivedDate` AS `ReceivedDate`,
    `k`.`Used` AS `Used`,
    `k`.`Notes` AS `Notes`,
    `k`.`KegTypeId` AS `KegTypeId`,
(
        select
            `l`.`Name`
        from
            (
                `rwbbc_data`.`keg_location_history` `klh`
                join `rwbbc_data`.`locations` `l` on((`klh`.`FK_LocationId` = `l`.`Id`))
            )
        where
            (`klh`.`FK_RWBId` = `k`.`RWBId`)
        order by
            `klh`.`LocationDate` desc
        limit
            1
    ) AS `CurLoc`,
(
        select
            `klh`.`LocationDate`
        from
            (
                `rwbbc_data`.`keg_location_history` `klh`
                join `rwbbc_data`.`locations` `l` on((`klh`.`FK_LocationId` = `l`.`Id`))
            )
        where
            (`klh`.`FK_RWBId` = `k`.`RWBId`)
        order by
            `klh`.`LocationDate` desc
        limit
            1
    ) AS `CurLocDate`,
(
        select
            `b`.`name`
        from
            (
                `rwbbc_data`.`keg_fill_history` `kfh`
                join `rwbbc`.`beers` `b` on((`kfh`.`FK_BeerId` = `b`.`id`))
            )
        where
            (`kfh`.`FK_RWBId` = `k`.`RWBId`)
        order by
            `kfh`.`FillDate` desc
        limit
            1
    ) AS `CurBeer`,
(
        select
            `kfh`.`Gallons`
        from
            `rwbbc_data`.`keg_fill_history` `kfh`
        where
            (`kfh`.`FK_RWBId` = `k`.`RWBId`)
        order by
            `kfh`.`FillDate` desc
        limit
            1
    ) AS `CurGallons`
from
    `rwbbc_data`.`keg_info` `k`