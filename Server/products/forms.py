from django import forms
from .models import Product, Comment1,Order

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
        model = Order
        fields = ['order_item', 'order_quantity']

    order_item = forms.CharField(max_length=1000, label='Item')
    order_quantity = forms.CharField(max_length=255, label='Quantity')

