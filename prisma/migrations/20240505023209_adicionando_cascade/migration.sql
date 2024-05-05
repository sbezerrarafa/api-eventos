-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check-ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id" INTEGER NOT NULL,
    CONSTRAINT "check-ins_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendees" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check-ins" ("attendee_id", "created_at", "id") SELECT "attendee_id", "created_at", "id" FROM "check-ins";
DROP TABLE "check-ins";
ALTER TABLE "new_check-ins" RENAME TO "check-ins";
CREATE UNIQUE INDEX "check-ins_attendee_id_key" ON "check-ins"("attendee_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
