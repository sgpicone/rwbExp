USE `rwbbc_data`;

create view `KegDetails` AS select
    `KegDetails`.`Id` AS `Id`,
    `KegDetails`.`RWBId` AS `RWBId`,
    `KegDetails`.`FactorySerial` AS `FactorySerial`,
    `KegDetails`.`ReceivedDate` AS `ReceivedDate`,
    `KegDetails`.`Used` AS `Used`,
    `KegDetails`.`Notes` AS `Notes`,
    `KegDetails`.`KegType` AS `KegType`,
    `KegDetails`.`Current Location` AS `Current Location`,
    `KegDetails`.`Last Fill Date` AS `Last Fill Date`,
    `KegDetails`.`Last Fill Beer` AS `Last Fill Beer`,
    `KegDetails`.`Last Fill Volume` AS `Last Fill Volume`,
    `KegDetails`.`Last Wash Date` AS `Last Wash Date`,
    `KegDetails`.`Last Wash Chemical` AS `Last Wash Chemical`,
    coalesce(
        (
            case
                when (
                    (
                        select
                            `rwbbc_data`.`chemicals`.`ChemicalType`
                        from
                            `rwbbc_data`.`chemicals`
                        where
                            (
                                `rwbbc_data`.`chemicals`.`Name` = `KegDetails`.`Last Wash Chemical`
                            )
                    ) = 'ACID'
                ) then 'CAUSTIC'
                when (
                    (
                        select
                            `rwbbc_data`.`chemicals`.`ChemicalType`
                        from
                            `rwbbc_data`.`chemicals`
                        where
                            (
                                `rwbbc_data`.`chemicals`.`Name` = `KegDetails`.`Last Wash Chemical`
                            )
                    ) = 'CAUSTIC'
                ) then 'ACID'
            end
        ),
        'ACID OR CAUSTIC'
    ) AS `Next Wash Chemical`,
    `KegDetails`.`Last Sani Date` AS `Last Sani Date`,
    `KegDetails`.`Last Breakdown` AS `Last Breakdown`,
    coalesce(
        (
            case
                when (
                    (
                        greatest(
                            `KegDetails`.`Last Fill Date`,
                            `KegDetails`.`Last Wash Date`,
                            `KegDetails`.`Last Sani Date`
                        ) = `KegDetails`.`Last Fill Date`
                    )
                    and (
                        (`KegDetails`.`Current Location` like '%TAP')
                        or (`KegDetails`.`Current Location` like '%BMNT')
                        or (`KegDetails`.`Current Location` like 'CUSTOMER')
                    )
                ) then 'FULL'
                when (
                    (
                        (
                            greatest(
                                `KegDetails`.`Last Fill Date`,
                                `KegDetails`.`Last Wash Date`,
                                `KegDetails`.`Last Sani Date`
                            ) = `KegDetails`.`Last Fill Date`
                        )
                        and (
                            `KegDetails`.`Current Location` like 'STORAGE-DIRTY'
                        )
                    )
                    or (
                        `KegDetails`.`Current Location` like 'STORAGE-RINSED'
                    )
                ) then 'DIRTY'
                when (
                    (
                        greatest(
                            `KegDetails`.`Last Fill Date`,
                            `KegDetails`.`Last Wash Date`,
                            `KegDetails`.`Last Sani Date`
                        ) = `KegDetails`.`Last Wash Date`
                    )
                    and (
                        `KegDetails`.`Current Location` like 'STORAGE-WASHED'
                    )
                ) then 'WASHED'
                when (
                    (
                        (
                            greatest(
                                `KegDetails`.`Last Fill Date`,
                                `KegDetails`.`Last Wash Date`,
                                `KegDetails`.`Last Sani Date`
                            ) = `KegDetails`.`Last Sani Date`
                        )
                        and (
                            `KegDetails`.`Current Location` like 'STORAGE-BMNT'
                        )
                    )
                    or (
                        `KegDetails`.`Current Location` like 'STORAGE/BREWERY'
                    )
                ) then 'SANI'
                when (
                    greatest(
                        `KegDetails`.`Last Fill Date`,
                        `KegDetails`.`Last Wash Date`,
                        `KegDetails`.`Last Sani Date`
                    ) = NULL
                ) then 'UNKNOWN'
                when (
                    `KegDetails`.`Current Location` like 'QUARANTINE%'
                ) then 'QUARANTINED'
            end
        ),
        'UNKNOWN'
    ) AS `STATUS`,
    `KegDetails`.`NumIssues` AS `NumIssues`
from
    (
        select
            `k`.`Id` AS `Id`,
            `k`.`RWBId` AS `RWBId`,
            `k`.`FactorySerial` AS `FactorySerial`,
            `k`.`ReceivedDate` AS `ReceivedDate`,
            `k`.`Used` AS `Used`,
            `k`.`Notes` AS `Notes`,
            `kt`.`type` AS `KegType`,
(
                select
                    `l`.`Name`
                from
                    (
                        `rwbbc_data`.`keg_location_history` `klh`
                        join `rwbbc_data`.`locations` `l` on((`l`.`Id` = `klh`.`FK_LocationId`))
                    )
                where
                    (`klh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `klh`.`LocationDate` desc
                limit
                    1
            ) AS `Current Location`,
(
                select
                    `b`.`name`
                from
                    (
                        `rwbbc_data`.`keg_fill_history` `kfh`
                        join `rwbbc`.`beers` `b` on((`b`.`id` = `kfh`.`FK_BeerId`))
                    )
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`FillDate` desc
                limit
                    1
            ) AS `Last Fill Beer`,
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
            ) AS `Last Fill Volume`,
(
                select
                    `kfh`.`FillDate`
                from
                    `rwbbc_data`.`keg_fill_history` `kfh`
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`FillDate` desc
                limit
                    1
            ) AS `Last Fill Date`,
(
                select
                    `b`.`Name`
                from
                    (
                        `rwbbc_data`.`keg_wash_history` `kfh`
                        join `rwbbc_data`.`chemicals` `b` on((`b`.`Id` = `kfh`.`FK_WashChemicalId`))
                    )
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`WashDate` desc
                limit
                    1
            ) AS `Last Wash Chemical`,
(
                select
                    `kfh`.`WashDate`
                from
                    `rwbbc_data`.`keg_wash_history` `kfh`
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`WashDate` desc
                limit
                    1
            ) AS `Last Wash Date`,
(
                select
                    `kfh`.`SaniDate`
                from
                    `rwbbc_data`.`keg_sani_history` `kfh`
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`SaniDate` desc
                limit
                    1
            ) AS `Last Sani Date`,
(
                select
                    `kfh`.`BreakdownDate`
                from
                    `rwbbc_data`.`keg_breakdown_history` `kfh`
                where
                    (`kfh`.`FK_RWBId` = `k`.`RWBId`)
                order by
                    `kfh`.`BreakdownDate` desc
                limit
                    1
            ) AS `Last Breakdown`,
(
                select
                    count(`kil`.`Id`)
                from
                    `rwbbc_data`.`keg_issue_log` `kil`
                where
                    (`kil`.`FK_RWBId` = `k`.`RWBId`)
            ) AS `NumIssues`
        from
            (
                `rwbbc_data`.`keg_info` `k`
                join `rwbbc_data`.`keg_types` `kt` on((`kt`.`id` = `k`.`KegTypeId`))
            )
    ) `KegDetails`