CREATE INDEX `agent_metrics_24h_agent_timestamp_idx` ON `agent_metrics_24h` (`agent_id`,`timestamp`);--> statement-breakpoint
CREATE INDEX `monitor_daily_stats_monitor_id_date_idx` ON `monitor_daily_stats` (`monitor_id`,`date`);--> statement-breakpoint
CREATE INDEX `monitor_status_history_24h_monitor_timestamp_idx` ON `monitor_status_history_24h` (`monitor_id`,`timestamp`);