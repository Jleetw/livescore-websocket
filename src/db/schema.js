import { pgTable, serial, text, integer, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum('match_status', ['scheduled', 'live', 'finished', 'postponed']);

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  sport: text("sport").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  status: matchStatusEnum("status").notNull().default('scheduled'),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  homeScore: integer("home_score").default(0).notNull(),
  awayScore: integer("away_score").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const commentaries = pgTable("commentaries", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => matches.id).notNull(),
  minute: integer("minute").notNull(),
  sequence: integer("sequence"),
  period: text("period"),
  eventType: text("event_type"),
  team: text("team"),
  player: text("player"),
  message: text("message").notNull(),
  tags: text("tags").array(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});