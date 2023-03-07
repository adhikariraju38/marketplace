from django.db import models
from django.urls import reverse

class Farmer(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    address = models.TextField()
    profile_image = models.ImageField(upload_to='farmer_images')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('farmer_detail', args=[str(self.id)])

class FarmingDetails(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    product_received = models.CharField(max_length=100, blank=True, null=True)
    payment_done = models.CharField(max_length=100, blank=True, null=True)
    product_sold = models.CharField(max_length=100, blank=True, null=True)
    product_remaining = models.CharField(max_length=100, blank=True, null=True)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.farmer.name}'s Farming Details"

    def get_absolute_url(self):
        return reverse('farming_details_list', args=[str(self.farmer.id)])
