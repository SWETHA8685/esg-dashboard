from django.db import models


class EmissionRecord(models.Model):

    SOURCE_CHOICES = [
        ("SAP", "SAP"),
        ("UTILITY", "UTILITY"),
        ("TRAVEL", "TRAVEL"),
    ]


    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]


    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    category = models.CharField(
        max_length=100
    )

    amount = models.FloatField()

    unit = models.CharField(
        max_length=50
    )

    normalized_unit = models.CharField(
        max_length=50,
        default="kgCO2e"
    )

    date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    suspicious = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return self.category