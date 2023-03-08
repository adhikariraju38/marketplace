from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import Farmer, FarmingDetails
from .forms import FarmerForm
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FarmingDetails
from .serializers import FarmingDetailsSerializer

class CreateFarmerView(View):
    def post(self, request):
        form = FarmerForm(request.POST, request.FILES)
        if form.is_valid():
            farmer = form.save()
            return JsonResponse({'success':True}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)

class FarmerDeleteView(View):
    def delete(self, request, farmer_id):
        farmer = get_object_or_404(Farmer, id=farmer_id)
        farmer.delete()
        return JsonResponse({'success': True}, status=200)

class FarmerDetailView(View):
    def get(self, request, farmer_identifier):
        farmer = get_object_or_404(Farmer, Q(id=farmer_identifier) | Q(name=farmer_identifier))
        data = {
            'id': farmer.id,
            'name': farmer.name,
            'address': farmer.address,
            'age': farmer.age,
            'profile_image_url': farmer.profile_image.url if farmer.profile_image else None,
        }
        return JsonResponse(data, status=200)

class FarmerListView(View):
    def get(self, request):
        farmers = Farmer.objects.all()
        data = []
        for farmer in farmers:
            farmer_data = {
                'id': farmer.id,
                'name': farmer.name,
                'address': farmer.address,
                'age': farmer.age,
                'profile_image_url': farmer.profile_image.url if farmer.profile_image else None,
            }
            data.append(farmer_data)
        return JsonResponse(data, status=200, safe=False)

class FarmingDetailsCreateView(View):
    def post(self, request, farmer_id):
        farmer = get_object_or_404(Farmer, id=farmer_id)
        product_received = request.POST.get('product_received', None)
        payment_done = request.POST.get('payment_done', None)
        product_sold = request.POST.get('product_sold', None)
        product_remaining = request.POST.get('product_remaining', None)
        
        farming_details = FarmingDetails(
            farmer=farmer,
            product_received=product_received,
            payment_done=payment_done,
            product_sold=product_sold,
            product_remaining=product_remaining
        )
        farming_details.save()
        
        data = {'id': farming_details.id, 'farmer_id': farming_details.farmer.id}
        if product_received is not None:
            data['product_received'] = farming_details.product_received
        if payment_done is not None:
            data['payment_done'] = farming_details.payment_done
        if product_sold is not None:
            data['product_sold'] = farming_details.product_sold
        if product_remaining is not None:
            data['product_remaining'] = farming_details.product_remaining
        
        return JsonResponse({'success': True}, status=201)

class FarmingDetailsDeleteView(View):
    def delete(self, request, farming_details_id):
        farming_details = get_object_or_404(FarmingDetails, id=farming_details_id)
        farming_details.delete()
        return JsonResponse({'success': True}, status=200)

class FarmingDetailsDetailView(View):
    def get(self, request, farmer_id):
        farmer = get_object_or_404(Farmer, id=farmer_id)
        farming_details = FarmingDetails.objects.filter(farmer=farmer)
        data = []
        for fd in farming_details:
            fd_data = {
                'id': fd.id,
                'farmer_id': fd.farmer.id,
                'added_on': fd.added_on
            }
            if fd.product_received is not None:
                fd_data['product_received'] = fd.product_received
            if fd.payment_done is not None:
                fd_data['payment_done'] = fd.payment_done
            if fd.product_sold is not None:
                fd_data['product_sold'] = fd.product_sold
            if fd.product_remaining is not None:
                fd_data['product_remaining'] = fd.product_remaining
            data.append(fd_data)
        return JsonResponse(data, status=200,safe=False)



class FarmingDetailsUpdateView(APIView):
    def patch(self, request, farming_details_id):
        farming_details = get_object_or_404(FarmingDetails, id=farming_details_id)
        serializer = FarmingDetailsSerializer(farming_details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




