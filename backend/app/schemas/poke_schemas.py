from pydantic import BaseModel
from typing import Callable

class ListPaginationParams(BaseModel):
    offset: int = 0
    limit : int = 20
