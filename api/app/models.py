from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as orm
from sqlalchemy.sql import func
from datetime import datetime, timezone
from app import db

class User(db.Model):
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    username: orm.Mapped[str] = orm.mapped_column(sa.String(64), index=True, unique=True)
    email: orm.Mapped[str] = orm.mapped_column(sa.String(120), index=True, unique=True)
    hashed_password: orm.Mapped[Optional[str]] = orm.mapped_column(sa.String(256))
    journals: orm.Mapped[list["JournalEntry"]] = orm.relationship(back_populates="author")

    def __repr__(self):
        return f'<User {self.username}>'

class Category(db.Model):
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(256))
    journal_entries: orm.Mapped[list["JournalEntry"]] = orm.relationship(back_populates="category")

    def __repr__(self):
        return f'<Category {self.name}>'

class JournalEntry(db.Model):
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    title: orm.Mapped[str] = orm.mapped_column(sa.String(120), nullable=False)
    content: orm.Mapped[str] = orm.mapped_column(sa.Text, nullable=False)
    date: orm.Mapped[datetime] = orm.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))
    category_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey(Category.id), index=True)
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey(User.id), index=True)

    # Relationships
    author: orm.Mapped["User"] = orm.relationship(back_populates="journals")
    category: orm.Mapped["Category"] = orm.relationship(back_populates="journal_entries")

    # Additional fields
    created_at: orm.Mapped[datetime] = orm.mapped_column(default=func.now())
    updated_at: orm.Mapped[datetime] = orm.mapped_column(default=func.now(), onupdate=func.now())

    def __repr__(self):
        return (f'<JournalEntry(id={self.id}, '
                f'title="{self.title}", '
                f'date="{self.date}", '
                f'category_id={self.category_id}, '
                f'user_id={self.user_id})>')
