from rest_framework import serializers
from .models import FarmingDetails

class FarmingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmingDetails
        fields = ['id', 'farmer', 'product_received', 'payment_done', 'product_sold', 'product_remaining']
        read_only_fields = ['id', 'farmer']
