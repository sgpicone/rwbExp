USE `rwbbc_data`;

CREATE VIEW `ExciseTaxes` AS
select
    `b`.`id` AS `Id`,
    `b`.`name` AS `Beer`,
    date_format(`kfh`.`FillDate`, '%Y-%m-%d') AS `KegDate`,
    sum(`kfh`.`Gallons`) AS `TotalVolume`,
    month(`kfh`.`FillDate`) AS `MONTH`,
    year(`kfh`.`FillDate`) AS `YEAR`,
    round((month(`kfh`.`FillDate`) / 2), 0) AS `TwoMonthCycle`,
    ceiling((month(`kfh`.`FillDate`) / 3)) AS `Quarter`
from
    (
        `rwbbc_data`.`keg_fill_history` `kfh`
        join `rwbbc`.`beers` `b` on((`kfh`.`FK_BeerId` = `b`.`id`))
    )
where
    (not((`kfh`.`FK_RWBId` like '%-C-%')))
group by
    `kfh`.`FillDate`,
    `kfh`.`FK_BeerId`
order by
    `KegDate`;