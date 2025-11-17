from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from djongo import models
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear all collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        captain = User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel)
        batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        superman = User.objects.create(name='Superman', email='superman@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=ironman, type='Running', duration=30, calories=300, date='2025-11-17')
        Activity.objects.create(user=batman, type='Cycling', duration=45, calories=400, date='2025-11-17')

        # Create workouts
        Workout.objects.create(name='Hero HIIT', description='High intensity for heroes', difficulty='Hard')
        Workout.objects.create(name='Power Yoga', description='Yoga for super strength', difficulty='Medium')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=1000)
        Leaderboard.objects.create(team=dc, points=900)

        # Ensure unique index on email
        with connection.cursor() as cursor:
            cursor.execute('''db.users.createIndex({ "email": 1 }, { "unique": true })''')

        self.stdout.write(self.style.SUCCESS('Database populated with superhero test data.'))
