from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')
        User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        User.objects.create(name='Batman', email='batman@dc.com', team=dc)

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 2)

    def test_team_creation(self):
        self.assertEqual(Team.objects.count(), 2)

    def test_activity_creation(self):
        user = User.objects.first()
        Activity.objects.create(user=user, type='Running', duration=30, calories=300, date='2025-11-17')
        self.assertEqual(Activity.objects.count(), 1)

    def test_workout_creation(self):
        Workout.objects.create(name='Hero HIIT', description='High intensity', difficulty='Hard')
        self.assertEqual(Workout.objects.count(), 1)

    def test_leaderboard_creation(self):
        team = Team.objects.first()
        Leaderboard.objects.create(team=team, points=1000)
        self.assertEqual(Leaderboard.objects.count(), 1)
