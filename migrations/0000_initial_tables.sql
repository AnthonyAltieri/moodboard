CREATE TABLE `fund_benchmarks` (
	`from_fund_id` varchar(12) NOT NULL,
	`to_security_id` varchar(12) NOT NULL,
	CONSTRAINT `pk_fund_benchmarks` PRIMARY KEY(`from_fund_id`)
);

CREATE TABLE `fund_group_quarterly_weights` (
	`fund_id` varchar(12) NOT NULL,
	`quarter` enum('1','2','3','4') NOT NULL,
	`year` smallint NOT NULL,
	`component_fund_id` varchar(12) NOT NULL,
	`reported_value` double,
	`quarter_over_quarter_value_change` double,
	`simulated_quarter_to_date_performance` float,
	`weight` float NOT NULL,
	`top_position_security_id` varchar(12),
	`biggest_entry_security_id` varchar(12),
	`biggest_exit_security_id` varchar(12),
	`biggest_add_security_id` varchar(12),
	`biggest_trim_security_id` varchar(12),
	CONSTRAINT `pk_fund_group_quarterly_weights` PRIMARY KEY(`component_fund_id`,`fund_id`,`quarter`,`year`)
);

CREATE TABLE `fund_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fund_id` varchar(12) NOT NULL,
	`name` varchar(512) NOT NULL,
	`url` varchar(512) NOT NULL,
	CONSTRAINT `pk_fund_links` PRIMARY KEY(`id`)
);

CREATE TABLE `fund_quarterly_weights` (
	`fund_id` varchar(12) NOT NULL,
	`quarter` enum('1','2','3','4') NOT NULL,
	`year` smallint NOT NULL,
	`component_security_id` varchar(12) NOT NULL,
	`weight` float NOT NULL,
	`quarter_over_quarter_share_change` int,
	`quarter_over_quarter_weight_change` float,
	`average_skill_quartile` tinyint,
	`crowding_quartile` tinyint,
	`quarter_first_owned` enum('1','2','3','4') NOT NULL,
	`year_first_owned` tinyint NOT NULL,
	`current_holding_period_in_quarters` tinyint NOT NULL,
	CONSTRAINT `pk_fund_quarterly_weights` PRIMARY KEY(`component_security_id`,`fund_id`,`quarter`,`year`)
);

CREATE TABLE `fund_trailing_3m_stats` (
	`fund_id` varchar(12) NOT NULL,
	`date` date NOT NULL,
	`annualized_return` float,
	`standard_deviation` float,
	`statistical_alpha` float,
	`information_ratio` float,
	`sharpe` float,
	`calmar` float,
	`downside_deviation` float,
	CONSTRAINT `pk_fund_trailing_3m_stats` PRIMARY KEY(`date`,`fund_id`)
);

CREATE TABLE `funds` (
	`id` varchar(12) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`sector` varchar(100) NOT NULL,
	`is_group` boolean NOT NULL,
	CONSTRAINT `pk_funds` PRIMARY KEY(`id`)
);

CREATE TABLE `securities` (
	`id` varchar(12) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`ticker` varchar(10) NOT NULL,
	`sector` varchar(100) NOT NULL,
	`is_group` boolean NOT NULL,
	CONSTRAINT `pk_securities` PRIMARY KEY(`id`)
);

CREATE TABLE `security_benchmarks` (
	`from_security_id` varchar(12) NOT NULL,
	`to_security_id` varchar(12) NOT NULL,
	CONSTRAINT `pk_security_benchmarks` PRIMARY KEY(`from_security_id`)
);

CREATE TABLE `security_group_quarterly_weights` (
	`security_id` varchar(12) NOT NULL,
	`quarter` enum('1','2','3','4') NOT NULL,
	`year_first_owned` smallint NOT NULL,
	`component_security_id` varchar(12) NOT NULL,
	`weight` float NOT NULL,
	`quarter_over_quarter_share_change` int,
	`quarter_over_quarter_weight_change` float,
	`hodlers` int,
	`entries` int,
	`adds` int,
	`trims` int,
	`average_skill_quartile` tinyint,
	`crowding_quartile` tinyint,
	CONSTRAINT `pk_security_group_quarterly_weights` PRIMARY KEY(`component_security_id`,`quarter`,`security_id`,`year_first_owned`)
);

CREATE TABLE `security_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`security_id` varchar(12),
	`name` varchar(512) NOT NULL,
	`url` varchar(512) NOT NULL,
	CONSTRAINT `pk_security_links` PRIMARY KEY(`id`)
);

CREATE TABLE `security_prices` (
	`securtiy_id` varchar(12) NOT NULL,
	`date` date NOT NULL,
	`price` float NOT NULL,
	CONSTRAINT `pk_security_prices` PRIMARY KEY(`date`,`securtiy_id`)
);

CREATE TABLE `security_quarterly_holders` (
	`security_id` varchar(12) NOT NULL,
	`quarter` enum('1','2','3','4') NOT NULL,
	`year` smallint NOT NULL,
	`position_value` int,
	`fund_percentage` float,
	`fund_average_position_size` float,
	`fund_shares` int,
	`quarter_over_quarter_share_change` int,
	`manager_quartile` tinyint,
	`holding_period_in_quarters` smallint,
	`fund_weighted_average_holding_period_in_quarters` smallint,
	`year_first_owned` smallint,
	`current_holding_period_in_quarters` smallint,
	CONSTRAINT `pk_security_quarterly_holders` PRIMARY KEY(`quarter`,`security_id`,`year`)
);

CREATE TABLE `security_quarterly_stats` (
	`security_id` varchar(12) NOT NULL,
	`quarter` enum('1','2','3','4') NOT NULL,
	`year` smallint NOT NULL,
	`stat_name` varchar(200) NOT NULL,
	`stat_type` enum('string','number') NOT NULL,
	`stat_value` json,
	CONSTRAINT `pk_security_quarterly_stats` PRIMARY KEY(`quarter`,`security_id`,`year`)
);

CREATE TABLE `security_trailing_3m_stats` (
	`security_id` varchar(12) NOT NULL,
	`date` date NOT NULL,
	`annualized_return` float,
	`standard_deviation` float,
	`statistical_alpha` float,
	`information_ratio` float,
	`sharpe` float,
	`calmar` float,
	`downside_deviation` float,
	CONSTRAINT `pk_security_trailing_3m_stats` PRIMARY KEY(`date`,`security_id`)
);

CREATE INDEX `fund_links_fund_id` ON `fund_links` (`fund_id`);
CREATE INDEX `security_links_security_id` ON `security_links` (`security_id`);