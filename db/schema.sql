CREATE TABLE IF NOT EXISTS lectures (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subject varchar(5) NOT NULL CHECK (length(trim(subject)) > 0),
  name varchar(20),
  room varchar(8) NOT NULL,
  creator_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lectures_recent ON lectures (updated_at DESC, id DESC);

CREATE TABLE IF NOT EXISTS seats (
  lecture_id bigint NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
  seat_number integer NOT NULL CHECK (seat_number > 0),
  user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  PRIMARY KEY (lecture_id, seat_number),
  UNIQUE (lecture_id, user_id)
);
