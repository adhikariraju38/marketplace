from django import forms
from .models import Product, Comment1,Order1

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'description','category', 'price', 'quantity', 'image','store']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
            'image': forms.ClearableFileInput(attrs={'multiple': True}),
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment1
        fields = ('product_id', 'body',"rating")

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order1
        fields = ['order_message']

