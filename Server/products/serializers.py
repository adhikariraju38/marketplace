from rest_framework import serializers
from .models import Product, Comment1

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment1
        fields = ('name', 'body','rating', 'created_on')

class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price', 'category', 'image', 'quantity', 'description', 'uploaded_by', 'comments', "created_at","store")
    
class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', "category",'image',"quantity","description","price","store" ]
        read_only_fields = ['id']

class ProductQuantityUpdateSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField()

    class Meta:
        model = Product
        fields = ('quantity',)
        read_only_fields = ('quantity',)

    def validate_quantity(self, value):
        current_quantity = self.instance.quantity
        new_quantity = current_quantity + value
        if new_quantity < 0:
            raise serializers.ValidationError('Quantity cannot be negative.')
        return new_quantity

    def update(self, instance, validated_data):
        instance.quantity = validated_data['quantity']
        instance.save()
        return instance

from rest_framework import serializers
from .models import Cart1

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart1
        fields = ['id', 'user', 'product', 'quantity']

