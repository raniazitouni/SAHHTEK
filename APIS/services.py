
import random
import time

class SGPHService:
    """
    This class is an abstraction of the SGPH system. It simulates communicating with SGPH.
    In real-world, this would be replaced with an actual REST API call to the SGPH system.
    """
    @staticmethod
    def send_ordonnance_for_validation(ordonnance_data):
        # Simulating communication with SGPH (for example, using REST API)
        time.sleep(2)  # Simulate delay in communication
        
        # Simulate a random validation outcome from SGPH (in a real case, SGPH would return a proper response)
        is_valid = random.choice([True, False])
        
        # Return a result
        return {
            'is_valid': is_valid,
            'message': 'Ordonnance validée' if is_valid else 'Ordonnance invalide'
        }
