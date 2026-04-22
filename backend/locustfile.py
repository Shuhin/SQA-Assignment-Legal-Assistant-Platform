from locust import HttpUser, task, between

class LegalAssistantUser(HttpUser):
    # Each user waits 1-2 seconds between requests
    wait_time = between(1, 2)

    @task
    def search_law(self):
        self.client.post("/generate", json={"query": "law"})

    @task
    def search_contract(self):
        self.client.post("/generate", json={"query": "contract"})

    @task
    def search_empty(self):
        self.client.post("/generate", json={"query": ""})