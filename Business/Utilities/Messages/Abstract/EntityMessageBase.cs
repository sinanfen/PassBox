using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utilities.Messages.Abstract;

public abstract class EntityMessageBase<TEntity>
{
    protected abstract string GetEntityTitle(TEntity entity);
    protected abstract int GetEntityId(TEntity entity);

    public string NotFound(bool isPlural)
    {
        if (isPlural)
            return $"No {typeof(TEntity).Name} information was found.";

        return $"No such {typeof(TEntity).Name} found.";
    }

    public virtual string NotFoundById(int id)
    {
        var entityTypeName = typeof(TEntity).Name;
        return $"No {entityTypeName} found for the {entityTypeName} code {id}.";
    }


    public virtual string Add(TEntity entity)
    {
        var entityTitle = GetEntityTitle(entity);
        return $"The {typeof(TEntity).Name} titled '{entityTitle}' has been successfully added.";
    }

    public string Update(TEntity entity)
    {
        var entityTitle = GetEntityTitle(entity);
        return $"The {typeof(TEntity).Name} titled '{entityTitle}' has been successfully updated.";
    }

    public string Delete(TEntity entity)
    {
        var entityTitle = GetEntityTitle(entity);
        return $"The {typeof(TEntity).Name} titled '{entityTitle}' has been successfully deleted.";
    }

    public string HardDelete(TEntity entity)
    {
        var entityTitle = GetEntityTitle(entity);
        return $"The {typeof(TEntity).Name} '{entityTitle}' has been successfully deleted from the database.";
    }

    public string UndoDelete(TEntity entity)
    {
        var entityTitle = GetEntityTitle(entity);
        return $"The {typeof(TEntity).Name} titled '{entityTitle}' has been successfully retrieved from the archive.";
    }
}
